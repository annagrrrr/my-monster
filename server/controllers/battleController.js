/*const Monster = require('../models/Monster');

exports.getRandomOpponent = async (req, res) => {
    try {
        const { powerLevel } = req.body; // powerLevel выбранного монстра игрока
        const opponents = await Monster.find({ powerLevel });

        if (opponents.length === 0) {
            return res.status(404).json({ message: 'No opponent found with the same power level' });
        }

        const randomIndex = Math.floor(Math.random() * opponents.length);
        const opponent = opponents[randomIndex];
        res.json(opponent);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching opponent', error });
    }
};

const getRandomDamage = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

exports.battle = async (req, res) => {
    try {
        const playerMonster = req.body.playerMonster;
        const opponentMonster = req.body.opponentMonster;

        let playerHealth = playerMonster.health;
        let opponentHealth = opponentMonster.health;

        while (playerHealth > 0 && opponentHealth > 0) {
            // Ход игрока
            const playerDamage = getRandomDamage(playerMonster.minAttack, playerMonster.maxAttack);
            opponentHealth -= playerDamage;

            // Проверка победы игрока
            if (opponentHealth <= 0) {
                const rewardMonster = await Monster.aggregate([{ $sample: { size: 1 } }]);
                return res.json({ result: 'win', reward: rewardMonster[0] });
            }

            // Ход противника
            const opponentDamage = getRandomDamage(opponentMonster.minAttack, opponentMonster.maxAttack);
            playerHealth -= opponentDamage;

            // Проверка победы противника
            if (playerHealth <= 0) {
                return res.json({ result: 'lose' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during battle', error });
    }
};
*/