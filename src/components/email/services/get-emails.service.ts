import { RootFilterQuery } from 'mongoose';
import { joiSchemaValidate } from '../../../lib/joi-schema-validate';
import { removeNullish } from '../../../lib/utils';
import { Email, EmailAttributes } from '../../../models/email.model';
import { EmailData, FilterEmailsPayload } from '../dto/email-dto.interface';
import { filterEmailsSchema } from '../dto/email-dto.schema';
import { isEmpty } from 'lodash';

export async function getEmailsService(
	filter: FilterEmailsPayload,
): Promise<EmailData[]> {
	const data = joiSchemaValidate(filter, filterEmailsSchema, {
		stripUnknown: true,
	});

	const emailsFilter: RootFilterQuery<EmailAttributes> = {};

	const cleanFilter = removeNullish(data);

	if (!isEmpty(cleanFilter)) {
		if ('id' in cleanFilter) {
			emailsFilter._id = cleanFilter.id;
		}
		if ('search' in cleanFilter && cleanFilter.search) {
			emailsFilter.$text = { $search: cleanFilter.search as string };
		}
		if ('read' in cleanFilter) {
			emailsFilter.read = cleanFilter.read;
		}
	}


  console.log(cleanFilter, data, filter, emailsFilter);

	const page = cleanFilter.page ?? 1;
	const limit = cleanFilter.limit ?? 10;

	const emails = await Email.find()
		.skip((page - 1) * limit)
		.limit(limit)
		.sort({ createdAt: -1 });

	return emails.map((email) => email.toJSON<EmailData>());
}
