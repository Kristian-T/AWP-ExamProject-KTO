
const express = require("express");
const router = express.Router();
const DiscussionContr = require("./DiscussionContr")

/**** Routes ****/
router.get('/', DiscussionContr.getDiscussions);
router.post('/', DiscussionContr.postDiscussion);
router.get('/:discussion_id', DiscussionContr.getDiscussionByID);
router.patch('/comment/:id', DiscussionContr.postComment);
router.post('/vote/:discussion_id', DiscussionContr.commentVote);
router.get('/newDiscussion');

module.exports = router;
