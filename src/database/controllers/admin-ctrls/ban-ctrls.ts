import BanLocationModel from '@database/model/ban-location-schema'

import { NextApiRequest, NextApiResponse } from 'next'

const getAllBans = async (res: NextApiResponse) => {
  try {
    const allBans = await BanLocationModel.find({}, { userIp: 1, reason: 1 })
    return res.status(200).json({ allBans })
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching feedbacks' })
  }
}

const addBanLocation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req

  const { userIp, reason } = body

  try {
    if (!userIp || !reason)
      return res.status(400).json({
        message: 'It is necessary to inform the userIp and the reason for ban'
      })

    const banLocationExists = await BanLocationModel.findOne({ userIp })

    if (banLocationExists)
      return res.status(400).json({ message: 'This location is already banned' })

    const newBan = new BanLocationModel({ userIp, reason })

    await newBan.save()

    return res.status(200).json({ message: 'Location has been banned sucessfully' })
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching feedbacks' })
  }
}

const removeBanLocation = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req

  const { idLocation } = query
  try {
    if (!idLocation)
      return res.status(400).json({
        message: 'It is necessary to inform the userIp to remove the ban'
      })

    const locationBanned = await BanLocationModel.deleteOne({
      _id: idLocation
    })

    if (locationBanned.deletedCount === 0)
      return res.status(400).json({ message: 'No ban has been deleted' })

    return res.json({ message: 'Ban removeded' })
  } catch (err) {
    return res.status(500).json({ message: 'Error remove ban' })
  }
}

export { getAllBans, addBanLocation, removeBanLocation }
