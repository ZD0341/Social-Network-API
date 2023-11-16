const router=require("express").Router(),{getThoughts:getThoughts,getSingleThought:getSingleThought,createThought:createThought,updateThought:updateThought,deleteThought:deleteThought,addReaction:addReaction,removeReaction:removeReaction}=require("../../controllers/thoughtController");router.route("/").get(getThoughts).post(createThought),router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought),router.route("/:thoughtId/reactions").post(addReaction).delete(removeReaction),module.exports=router;