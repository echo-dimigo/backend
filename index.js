import app from '@/app'
import dotenv from 'dotenv'

dotenv.config('.env')

const port = process.env.SERVER_PORT || 5000

app.listen(port, () => {
  console.log(`ECHO Backend is running on port ${port}`)
})
