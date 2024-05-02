/*!
 * 11ty prebuild script
 *
 * https://github.com/equk/
 *
 * Copyright (c) 2023 B.Walden. All rights reserved.
 *
 * Licensed under the MIT License
 *
 * (LICENSE file should be included with script)
 *
 */
import fs from 'fs'

const outputDir = 'dist'

async function preEleventy() {
  // Start time for cli stats
  const start = +new Date()
  console.log('[pre-11ty] Starting Clean Build')
  // Clean output if exists
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true })
    console.log(`[pre-11ty] Cleaning Old Build From ${outputDir}`)
    const end = +new Date()
    console.log(
      `[pre-11ty] Build Output: '${outputDir}' Removed (+${end - start}ms)`
    )
  } else {
    console.log(`[pre-11ty] Build Output: '${outputDir}' is clean`)
  }
  console.log('\n')
}

/*
 * Run Main Function
 */

preEleventy().catch((error) => {
  console.error(error)
  // quit if error
  process.exit(1)
})
