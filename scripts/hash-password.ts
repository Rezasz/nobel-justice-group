import bcrypt from 'bcryptjs'

async function main() {
  const password = process.argv[2]
  if (!password) {
    console.error('Usage: npx ts-node scripts/hash-password.ts <your-password>')
    process.exit(1)
  }
  const hash = await bcrypt.hash(password, 12)
  console.log('\nAdd to .env.local and Vercel env vars:')
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
}

main().catch(console.error)
