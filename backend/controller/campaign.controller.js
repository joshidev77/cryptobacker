const Campaign = require("../model/campaign.model")
const User = require("../model/user.model")
const path = require('path');
const fs = require("fs")

exports.createCampaign = async (req, res) => {
  let uploadedFilePaths = [];

  try {
    const { campaignCode, name, title, target, deadline, description, category } = req.body;
    const files = req.files;

    if (req.files && req.files.length > 0) {
      files.forEach(file => uploadedFilePaths.push(file.path));
    }

    if (!title || !target || !deadline || !description || !category || !campaignCode || !name || !req.user._id || !files) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      })
    }

    const campaignExist = await Campaign.exists({
      $or: [
        {
          campaignCode: campaignCode
        },
        {
          name: name.trim()
        },
        {
          title: title.trim()
        },
      ]
    })

    if (campaignExist) {
      // Remove uploaded files if campaign already exists
      uploadedFilePaths.forEach(filePath => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      return res.status(400).send({
        status: false,
        message: "CampaignCode, CampaignName or CamapaignTitle already registered"
      })
    }

    // Extract file information
    const filePaths = files.map(file => path.join('storage', req.user._id.toString(), file.filename));

    const campaign = new Campaign({
      campaignCode,
      name,
      owner: req.user._id,
      title,
      description,
      category,
      target,
      deadline,
      filePaths
    });

    await campaign.save();

    return res.status(200).send({
      status: true,
      message: "Campaign Created successfully",
      data: campaign
    });

  } catch (err) {
    console.log("Error : ", err)

    // Remove uploaded files if campaign already exists
    uploadedFilePaths.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}

exports.deleteCampaign = async (req, res) => {
  try {
    const { campaignCode } = req.body;

    if ((!campaignCode || isNaN(campaignCode)) || !req.user) {
      return res.status(400).send({
        status: false,
        message: "Invalid Details"
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "User Does Not Exist."
      });
    }

    // Find the campaign by owner and campaignCode
    const campaign = await Campaign.findOne({
      owner: req.user._id,
      campaignCode: Number(campaignCode)
    });

    if (!campaign) {
      return res.status(200).send({
        status: true,
        message: "Campaign not found with campaign_code : " + campaignCode,
      });
    }

    let fileDeleted = true;
    // Delete the associated files
    if (campaign.filePaths && campaign.filePaths.length > 0) {
      campaign.filePaths.forEach(file => {
        const filePath = "./" + file; // Construct the file path
        fs.unlink(filePath, (err) => {
          if (err) {
            fileDeleted = false;
            return;
          }
        });
      });
    }

    if (fileDeleted) {
      // Delete the campaign
      const result = await Campaign.deleteOne({ campaignCode: Number(campaignCode) });

      if (result.deletedCount === 0) {
        return res.status(404).json({
          status: false,
          message: "Campaign not found"
        });
      }

      return res.status(200).send({
        status: true,
        message: "Campaign deleted successfully",
        data: campaign
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Campaign cannot be deleted"
      });
    }
  } catch (err) {
    console.log("Error : ", err);
    return res.status(500).send({
      status: false,
      message: err.message || "Internal Server Error.",
    });
  }
}