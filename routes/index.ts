import * as express from 'express';
import {getStats, getWords, getChatters, getChannels} from "../services";
const router = express.Router();

router.get('/stats', getStats);
router.get('/stats/words', getWords);
router.get('/stats/chatters', getChatters);
router.get('/stats/channels', getChannels);

export default router;
