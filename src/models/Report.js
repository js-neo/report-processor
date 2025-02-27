
import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    telegram_id: { type: String, required: true }
}, { _id: false });

const VideoMetadataSchema = new Schema({
    creation_date: { type: String },
    gps_latitude: { type: String, default: null },
    gps_longitude: { type: String, default: null },
    duration: { type: String }
}, { _id: false });

const VideoDataSchema = new Schema({
    file_id: { type: String, required: true },
    file_url: { type: String, required: true },
    local_path: { type: String, required: true },
    file_name: { type: String, required: true },
    file_size_mb: { type: Number, required: true },
    mime_type: { type: String, required: true },
    metadata: { type: VideoMetadataSchema, required: true },
    drive_link: { type: String, required: true }
}, { _id: false });

const AnalysisDataSchema = new Schema({
    task: { type: String, required: true },
    workers: { type: [String], required: true },
    time: { type: Number, required: true }
}, { _id: false });

const ReportLogSchema = new Schema({
    timestamp: { type: Date, required: true },
    field: { type: String, required: true },
    old_value: { type: Schema.Types.Mixed },
    new_value: { type: Schema.Types.Mixed, required: true },
    type: { type: String, required: true }
}, { _id: false });


const ReportSchema = new Schema({
    _id: { type: String, required: true },
    timestamp: { type: Date, required: true },
    user: { type: UserSchema, required: true },
    video: { type: VideoDataSchema, required: true },
    transcript: { type: String, required: true },
    analysis: { type: AnalysisDataSchema, required: true },
    telegram_id: { type: String, required: true },
    report_logs: { type: [ReportLogSchema], default: [] },
    updated_at: { type: Date, required: true }
});

ReportSchema.index({ 'user.username': 1 });
ReportSchema.index({ 'user.username': 1, timestamp: -1 });
ReportSchema.index({ telegram_id: 1, timestamp: -1 });
ReportSchema.index({ 'analysis.task': 'text' });


const Report = mongoose.model('Report', ReportSchema);

export default Report;