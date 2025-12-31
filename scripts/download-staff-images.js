import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Map staff IDs to their image URLs from mentis.dk
const staffImages = {
  'mahmoud-ashkanian': 'https://cms87257.sfstatic.io/upload_dir/pics/Personale/Mahmoud-Ashkanian_-klinikejer-(personale).jpg',
  'mikkel-rune-vossen-rasmussen': 'https://cms87257.sfstatic.io/upload_dir/pics/mikkel-(1)-1.jpg',
  'phuong-le-resinia': 'https://cms87257.sfstatic.io/upload_dir/pics/Phuong.png',
  'bo-soendergaard-jensen': 'https://cms87257.sfstatic.io/upload_dir/pics/Bo-(1).jpg',
  'halil-oeztoprak': 'https://cms87257.sfstatic.io/upload_dir/pics/Halil-Oztopark-.jpg',
  'oezlem-mihladiz-ashkanian': 'https://cms87257.sfstatic.io/upload_dir/pics/Ozlem.jpg',
  'tanja-krogh-brandt': 'https://cms87257.sfstatic.io/upload_dir/pics/Tanja.jpg',
  'mohammed-soleimani': 'https://cms87257.sfstatic.io/upload_dir/pics/Mohammed-2.jpg',
  'henriette-mark': 'https://cms87257.sfstatic.io/upload_dir/pics/Henriette2.jpg',
}

const outputDir = path.join(__dirname, '..', 'public', 'images', 'staff')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

/**
 * Download an image from a URL and save it to a file
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(filepath)
        })
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        file.close()
        fs.unlinkSync(filepath)
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject)
      } else {
        file.close()
        fs.unlinkSync(filepath)
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`))
      }
    }).on('error', (err) => {
      file.close()
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath)
      }
      reject(err)
    })
  })
}

/**
 * Get file extension from URL
 */
function getExtension(url) {
  const match = url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  return match ? match[1].toLowerCase() : 'jpg'
}

/**
 * Main function to download all staff images
 */
async function main() {
  console.log('Starting download of staff images...\n')

  const results = {
    success: [],
    failed: [],
  }

  for (const [staffId, url] of Object.entries(staffImages)) {
    try {
      const ext = getExtension(url)
      const filename = `${staffId}.${ext}`
      const filepath = path.join(outputDir, filename)

      console.log(`Downloading ${staffId}...`)
      await downloadImage(url, filepath)
      console.log(`✓ Successfully downloaded ${filename}\n`)
      results.success.push({ staffId, filename, url })
    } catch (error) {
      console.error(`✗ Failed to download ${staffId}: ${error.message}\n`)
      results.failed.push({ staffId, url, error: error.message })
    }
  }

  // Summary
  console.log('\n=== Download Summary ===')
  console.log(`Successfully downloaded: ${results.success.length}`)
  console.log(`Failed: ${results.failed.length}`)

  if (results.success.length > 0) {
    console.log('\nSuccessfully downloaded images:')
    results.success.forEach(({ staffId, filename }) => {
      console.log(`  - ${staffId} → ${filename}`)
    })
  }

  if (results.failed.length > 0) {
    console.log('\nFailed downloads:')
    results.failed.forEach(({ staffId, error }) => {
      console.log(`  - ${staffId}: ${error}`)
    })
  }
}

main().catch(console.error)
