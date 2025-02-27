import Report from '../models/Report.js';


export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().select('-__v').lean();
        res.json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: error.message });
    }
};


export const getReportsByUser = async (req, res) => {
    try {
        const { username } = req.params;
        const reports = await Report.find({ 'user.username': username })
            .select('timestamp analysis video.transcript')
            .sort({ timestamp: -1 })
            .lean();

        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getReportsByPeriod = async (req, res) => {
    try {
        const { username } = req.params;
        const { start, end } = req.query;

        if (!start || !end) {
            return res.status(400).json({ error: 'Missing date parameters' });
        }

        const reports = await Report.find({
            'user.username': username,
            timestamp: {
                $gte: new Date(start),
                $lte: new Date(end)
            }
        })
            .select('timestamp analysis report_logs')
            .sort({ timestamp: 1 })
            .lean();

        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};