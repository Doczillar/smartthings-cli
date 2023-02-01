import { APICommand, outputItem, outputItemOrList } from '@smartthings/cli-lib'
import { chooseApp, oauthTableFieldDefinitions } from '../../lib/commands/apps-util'


export default class AppOauthCommand extends APICommand<typeof AppOauthCommand.flags> {
	static description = 'get OAuth information for the app' +
		this.apiDocsURL('getAppOauth')

	static flags = {
		...APICommand.flags,
		...outputItemOrList.flags,
	}

	static args = [{
		name: 'id',
		description: 'the app id or number in the list',
	}]

	static examples = [
		{
			description: 'prompt for an app and list OAuth information for it',
			command: 'smartthings apps:oauth',
		},
		{
			description: 'list OAuth information for the second app as listed via "smartthings apps"',
			command: 'smartthings apps:oauth 2',
		},
		{
			description: 'list OAuth information for app with the given id',
			command: 'smartthings apps:oauth 392bcb11-e251-44f3-b58b-17f93015f3aa',
		},
	]

	async run(): Promise<void> {
		const id = await chooseApp(this, this.args.id, { allowIndex: true })
		await outputItem(this, { tableFieldDefinitions: oauthTableFieldDefinitions }, () => this.client.apps.getOauth(id))
	}
}
