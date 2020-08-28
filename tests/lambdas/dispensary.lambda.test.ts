import { expect } from 'chai';
import 'mocha';
import * as dispensaryLambdas from '../../src/lambdas/dispensary.lambda';
import { response, AssignedBy } from '../../src/types';
import { getMockState } from '../test-utils';
import { NOT_FOUND, BAD_REQUEST, OK } from '../../src/constants';

describe('dispensary.lambda', () => {
    let response: response;
    let body;
    const callback = (any, testResponse) => {
        response = testResponse;
        body = JSON.parse(response.body);
    };
    let mockState;

    beforeEach(() => {
        response = null;
        mockState = getMockState();
    });

    describe('assignPreferredCarrierService', () => {
        it('returns error when unable to find dispensary', () => {
            dispensaryLambdas.assignPreferredCarrierService(mockState, null, callback);

            expect(response.statusCode).to.equal(NOT_FOUND);
            expect(body.message).to.equal(
                `Unable to find dispensary with id ${mockState.dispensaryId}`
            );
        });

        it("returns error when attempting to override bank's assignment", () => {
            mockState.dispensaryId = mockState.dispensaries[0].id;
            mockState.dispensaries[0].assignedBy = AssignedBy.Bank;

            dispensaryLambdas.assignPreferredCarrierService(mockState, null, callback);

            expect(response.statusCode).to.equal(BAD_REQUEST);
            expect(body.message).to.equal(
                "Unable to override bank's preferred carrier service assignment"
            );
        });

        it('returns error messages when unable to find carrier service', () => {
            mockState.dispensaryId = mockState.dispensaries[0].id;

            dispensaryLambdas.assignPreferredCarrierService(mockState, null, callback);

            expect(response.statusCode).to.equal(NOT_FOUND);
            expect(body.message).to.equal(
                `Unable to find carrier service with id ${mockState.carrierServiceId}`
            );
        });

        it('returns success and assigns preferredCarrierService', () => {
            mockState.dispensaryId = mockState.dispensaries[0].id;
            mockState.carrierServiceId = mockState.carrierServices[0].id;

            dispensaryLambdas.assignPreferredCarrierService(mockState, null, callback);

            expect(response.statusCode).to.equal(OK);
            expect(body.state.dispensaries[0].preferredCarrierServiceId).to.equal(
                mockState.carrierServiceId
            );
        });
    });

    describe('getCarrierService', () => {
        it('returns error when unable to find dispensary', () => {
            dispensaryLambdas.getCarrierService(mockState, null, callback);

            expect(response.statusCode).to.equal(NOT_FOUND);
            expect(body.message).to.equal(
                `Unable to find dispensary with id ${mockState.dispensaryId}`
            );
        });

        it('returns error when no preferredCarrierService is set', () => {
            mockState.dispensaryId = mockState.dispensaries[0].id;

            dispensaryLambdas.getCarrierService(mockState, null, callback);

            expect(response.statusCode).to.equal(NOT_FOUND);
            expect(body.message).to.equal('No preferred or default carrier service selected');
        });

        it('returns banks default carrier service', () => {
            mockState.dispensaryId = mockState.dispensaries[0].id;
            mockState.bank.defaultCarrierServiceId = mockState.carrierServices[0].id;

            dispensaryLambdas.getCarrierService(mockState, null, callback);

            expect(response.statusCode).to.equal(OK);
            expect(body.carrierService.id).to.equal(mockState.bank.defaultCarrierServiceId);
        });

        it("returns dispensary's preferred carrier service", () => {
            mockState.dispensaryId = mockState.dispensaries[0].id;
            mockState.dispensaries[0].preferredCarrierServiceId = mockState.carrierServices[0].id;

            dispensaryLambdas.getCarrierService(mockState, null, callback);

            expect(response.statusCode).to.equal(OK);
            expect(body.carrierService.id).to.equal(
                mockState.dispensaries[0].preferredCarrierServiceId
            );
        });
    });
});
