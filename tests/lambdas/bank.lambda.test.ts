import * as bankLambdas from '../../src/lambdas/bank.lambda';
import { expect } from 'chai';
import 'mocha';
import { NOT_FOUND, OK } from '../../src/constants';
import { response, AssignedBy } from '../../src/types';
import { getMockState } from '../test-utils';

describe('bank.lambda', () => {
    let response: response;
    let body;
    const callback = (any, testResponse) => {
        response = testResponse;
        body = JSON.parse(response.body);
    };

    beforeEach(() => {
        response = null;
    });

    describe('assignPreferredCarrerServiceToDispensary', () => {
        it('returns NOT_FOUND and error message when unable to find dispensary', () => {
            const mockState = getMockState();
            mockState.dispensaryId = 'notFoundId';

            bankLambdas.assignPreferredCarrierServiceToDispensary(mockState, null, callback);

            expect(response).to.not.equal(null);
            expect(response && response.statusCode).to.equal(NOT_FOUND);
            expect(body.message).to.equal('Unable to find dispensary with id notFoundId');
        });

        it('returns NOT_FOUND and error message when unable to find carrier service', () => {
            const mockState = getMockState();
            mockState.dispensaryId = mockState.dispensaries[0].id;
            mockState.carrierServiceId = 'notFoundId';

            bankLambdas.assignPreferredCarrierServiceToDispensary(mockState, null, callback);

            expect(response).to.not.equal(null);
            expect(response && response.statusCode).to.equal(NOT_FOUND);
            expect(body.message).to.equal('Unable to find carrier service with id notFoundId');
        });

        it("updates dispensary's preferred carrier service", () => {
            const mockState = getMockState();
            mockState.dispensaryId = mockState.dispensaries[0].id;
            mockState.carrierServiceId = mockState.carrierServices[0].id;

            bankLambdas.assignPreferredCarrierServiceToDispensary(mockState, null, callback);

            expect(response).to.not.equal(null);
            expect(response && response.statusCode).to.equal(OK);
            expect(body.state.dispensaries[0].preferredCarrierServiceId).to.equal(
                mockState.carrierServiceId
            );
            expect(body.state.dispensaries[0].assignedBy).to.equal(AssignedBy.Bank);
        });
    });

    describe('assignDefaultCarrierService', () => {
        it('returns NOT_FOUND and error message when unable to find carrier service', () => {
            const mockState = getMockState();
            mockState.carrierServiceId = 'notFoundId';

            bankLambdas.assignDefaultCarrierService(mockState, null, callback);

            expect(response.statusCode).to.equal(NOT_FOUND);
            expect(body.message).to.equal('Unable to find carrier service with id notFoundId');
        });

        it("sets bank's defaultCarrierService", () => {
            const mockState = getMockState();
            mockState.carrierServiceId = mockState.carrierServices[0].id;

            bankLambdas.assignDefaultCarrierService(mockState, null, callback);

            expect(response.statusCode).to.equal(OK);
            expect(body.state.bank.defaultCarrierServiceId).to.equal(
                mockState.carrierServices[0].id
            );
        });
    });
});
