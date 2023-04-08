import { findAddressData } from "../model/findAddressData.js"

export const getAddressDatas = (req, res) => {
  const address = req.params.address
  const addressData = findAddressData(address)
  res.json({
    addressData: addressData
  })
}
