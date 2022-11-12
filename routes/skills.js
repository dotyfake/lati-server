const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')
const SkillsController = require('../controllers/skillsController')


router.post('/createSkill', verifyToken,  SkillsController.createSkill)

router.patch('/editSkill', verifyToken,  SkillsController.editSkill)

router.delete('/deleteSkill', verifyToken,  SkillsController.deleteSkill)

router.get('/:slug',  SkillsController.getSkills)

module.exports = router
