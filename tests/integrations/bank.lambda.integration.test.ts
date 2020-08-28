import { Lambda, Config} from 'aws-sdk';
import { getMockState } from '../test-utils';
const lambda = new Lambda({
    region: 'us-east-1',
    accessKeyId: '123',
    secretAccessKey: 'xyz',
});

describe('bank.lambda integrations', () => {
    let mockState;

    beforeEach(() => {
        mockState = getMockState();
    });

    describe('assignPreferredCarrierServiceToDispensary', () => {
        it("updates dispensary's preferred carrier service", () => {
            const params = {
                FunctionName: 'assignPreferredCarrierServiceToDispensary', // the lambda function we are going to invoke
                InvocationType: 'RequestResponse',
                LogType: 'Tail',
                Payload: JSON.stringify(mockState),
            };

            lambda.invoke(params, (error, data) => {
                console.info({ error, data });
            });
        });
    });
});
