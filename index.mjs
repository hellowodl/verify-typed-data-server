import { verifyTypedData } from '@ethersproject/wallet'
import express from 'express'

const app = express()

app.post('/get-signer-address', (req, res) => {
   const { domain, types, value, signature } = req.body

    if (!domain || !types || !value || !signature) {
        res.status(400).send('Missing required parameters')
        return
    }

    try {
        const address = verifyTypedData(domain, types, value, signature)

        if (!address) {
            throw new Error('Error verifying signature')
        }

        res.status(200).send(address)
    } catch (error) {
        res.status(400).send(error.message || error)
    }
})

app.listen(3000, () => console.log('Server started on port 3000'))