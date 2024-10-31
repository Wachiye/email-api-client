import { Schema, model } from 'mongoose';

export interface EmailAttributes {
	id: string;
	sender: string;
	recipient: string;
	subject: string;
	content: string;
	read: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const emailSchema = new Schema<EmailAttributes>(
	{
		sender: { type: String, required: true },
		recipient: { type: String, required: true },
		subject: { type: String, required: true },
		content: { type: String, required: true },
		read: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

emailSchema.index({ sender: 'text', recipient: 'text' , subject:'text',content:'text'});

export const Email = model<EmailAttributes>('Email', emailSchema);
