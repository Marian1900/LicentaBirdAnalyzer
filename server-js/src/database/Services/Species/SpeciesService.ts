import express from 'express';
import { DEFAULT_ERROR_MESSAGE } from '../../../common/messages.js';
import { getBirdSpecies } from './SpeciesController.js';

const router = express.Router();
router.route('/species')
    .get(async function (req, res) {
        try {
            const result = await getBirdSpecies();
            res.send(result);
        } catch (err: any) {
            res.status(500);
            res.send(DEFAULT_ERROR_MESSAGE)
        }
    })
module.exports = router;