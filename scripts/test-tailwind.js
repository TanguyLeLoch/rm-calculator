#!/usr/bin/env node

/**
 * Integration test to verify Tailwind CSS classes are being generated
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist', 'rm-calculator', 'browser');

// Tailwind utility classes we expect to find in the build
const EXPECTED_CLASSES = [
  'flex',
  'items-center',
  'justify-center',
  'text-white',
  'bg-gray',
  'text-2xl',
  'font-bold',
  'mb-',
  'p-',
  'gap-'
];

function findCssFile() {
  const files = fs.readdirSync(DIST_DIR);
  const cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));
  if (!cssFile) {
    throw new Error('No styles CSS file found in dist folder');
  }
  return path.join(DIST_DIR, cssFile);
}

function testTailwindClasses() {
  console.log('🧪 Testing Tailwind CSS integration...\n');

  const cssPath = findCssFile();
  console.log(`📄 Reading: ${cssPath}\n`);

  const cssContent = fs.readFileSync(cssPath, 'utf-8');

  let passed = 0;
  let failed = 0;

  for (const className of EXPECTED_CLASSES) {
    const regex = new RegExp(`\\.${className}`, 'g');
    const matches = cssContent.match(regex);

    if (matches && matches.length > 0) {
      console.log(`  ✅ .${className} - found (${matches.length} occurrence(s))`);
      passed++;
    } else {
      console.log(`  ❌ .${className} - NOT FOUND`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(50));

  if (failed > 0) {
    console.log('\n❌ Tailwind CSS integration test FAILED');
    process.exit(1);
  } else {
    console.log('\n✅ Tailwind CSS integration test PASSED');
    process.exit(0);
  }
}

// Run the test
try {
  testTailwindClasses();
} catch (error) {
  console.error('❌ Test error:', error.message);
  process.exit(1);
}
