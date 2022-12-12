const User = require('../models/User');
const Skill = require('../models/Skill');

class AccountController {
    async getSkills(req, res, next) {
        
        const {slug, page, limit} = req.query
        try {
            const limitValue = limit ? +limit : 10
            const pageNumber = page ? +page : 1
            const skipAmount = pageNumber === 1 ? 0 : (pageNumber * limitValue) - 10;
            
            const skills = await Skill.find({ slug: slug }).limit(limitValue).skip(skipAmount);
            const countSkill = await Skill.countDocuments({ slug: slug })
            res.status(200).json({skills, countSkill});
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    async createSkill(req, res, next) {
        const userId = req.userId;
        const { name, nickname, slug, bannerUrl, gender, avatarUrl, price, iconUrl, intro } = req.body;
        try {
            const skillDetail = {
                name,
                nickname,
                slug,
                bannerUrl,
                gender,
                avatarUrl,
                iconUrl,
                price,
                intro,
                userId,
            };

            //Check skill already exist
            const skill = await Skill.findOne({ userId, slug });

            if (skill) return res.status(400).json({ success: false, message: 'Skill already exist.' });

            //Add skill to model User skills
            const user = await User.findByIdAndUpdate(
                userId,
                { $push: { skills: skillDetail } },
                { new: true, upsert: true },
            );

            //Create skill in model Skill
            const newSkill = new Skill(skillDetail);
            await newSkill.save();

            res.status(200).json({ skills: user.skills });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    async editSkill(req, res, next) {
        const userId = req.userId;
        const { slug, price, intro } = req.body;
        try {
            const skillDetail = {
                slug,
                price,
                intro,
                userId,
            };

            //update skill to model User skills
            const user = await User.findOneAndUpdate(
                { _id: userId, 'skills.slug': slug },
                { $set: { 'skills.$.price': price, 'skills.$.intro': intro } },
                { new: true },
            );

            //update skill in model Skill
            const skill = await Skill.findOne({ userId, slug });
            await skill.updateOne(skillDetail);

            res.status(200).json({ skills: user.skills });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    async deleteSkill(req, res, next) {
        const userId = req.userId;
        const { slug } = req.body;
        try {
        
            //delete skill to model User skills
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { skills: {slug: slug} } },
                { new: true },
            );

            //delete skill in model Skill
            const skill = await Skill.findOneAndDelete({ userId, slug });

            res.status(200).json({ skills: user.skills });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }
}

module.exports = new AccountController();
