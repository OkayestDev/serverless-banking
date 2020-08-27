import * as bankLambdas from '../../src/lambdas/bank.lambda';
import { State } from '../../src/interfaces/state.interface';
import { v4 } from 'uuid';
import { expect } from 'chai';
import 'mocha';
import { NOT_FOUND, OK } from '../../src/constants';
import type { response } from '../../src/types';

const getMockState = (): State => ({
    bank: {
        id: v4(),
        name: 'test bank',
        defaultCarrierServiceId: null,
    },
    carrierServiceId: '',
    dispensaryId: '',
    carrierServices: [
        {
            id: v4(),
            name: 'test carrier service',
        },
    ],
    dispensaries: [
        {
            id: v4(),
            name: 'test dispensary',
            preferredCarrierServiceId: null,
        },
    ],
});

describe('bank.lambda', () => {
    let response: response;
    const callback = (any, testResponse) => {
        response = testResponse;
    };

    beforeEach(() => {
        response = null;
    });

    describe('assignPreferredCarrerServiceToDispensary', () => {
        it('returns NOT_FOUND and error message when unable to find dispensary', () => {
            const mockState = getMockState();
            mockState.dispensaryId = 'notFoundId';

            bankLambdas.assignPreferredCarrierServiceToDispensary(mockState, null, callback);

            const body = JSON.parse(response.body);

            expect(response).to.not.equal(null);
            expect(response && response.statusCode).to.equal(NOT_FOUND);
            expect(body.message).to.equal('Unable to find dispensary with id notFoundId');
        });

        it('returns NOT_FOUND and error message when unable to find carrier service', () => {
            const mockState = getMockState();
            mockState.dispensaryId = mockState.dispensaries[0].id;
            mockState.carrierServiceId = 'notFoundId';

            bankLambdas.assignPreferredCarrierServiceToDispensary(mockState, null, callback);

            const body = JSON.parse(response.body);

            expect(response).to.not.equal(null);
            expect(response && response.statusCode).to.equal(NOT_FOUND);
            expect(body.message).to.equal('Unable to find carrier service with id notFoundId');
        });

        it("updates dispensary's preferred carrier service", () => {
            const mockState = getMockState();
            mockState.dispensaryId = mockState.dispensaries[0].id;
            mockState.carrierServiceId = mockState.carrierServices[0].id;

            bankLambdas.assignPreferredCarrierServiceToDispensary(mockState, null, callback);

            const body = JSON.parse(response.body);

            expect(response).to.not.equal(null);
            expect(response && response.statusCode).to.equal(OK);
            expect(body.state.dispensaries[0].preferredCarrierServiceId).to.equal(
                mockState.carrierServiceId
            );
        });
    });

    describe('')
});
