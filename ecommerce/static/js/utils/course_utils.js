define([
        'underscore',
        'models/course_seats/audit_seat',
        'models/course_seats/course_seat',
        'models/course_seats/honor_seat',
        'models/course_seats/professional_seat',
        'models/course_seats/verified_seat'
    ],
    function (_,
              AuditSeat,
              CourseSeat,
              HonorSeat,
              ProfessionalSeat,
              VerifiedSeat) {
        'use strict';

        return {
            seatSortObj: _.invert(_.object(_.pairs([
                'audit', 'honor', 'verified', 'no-id-professional', 'professional', 'credit'
            ]))),

            /**
             * Returns a mapping of seat types to CourseSeat classes.
             *
             * All classes included in the map extend CourseSeat.
             *
             * @returns {CourseSeat[]}
             */
            getSeatModelMap: _.memoize(function () {
                return _.indexBy([AuditSeat, HonorSeat, ProfessionalSeat, VerifiedSeat], 'seatType');
            }),

            /**
             * Returns a CourseSeat class corresponding to the seat type.
             *
             * @param {String} seatType
             * @returns {CourseSeat} - CourseSeat subclass, or CourseSeat if seatType is not mapped to a specific class.
             */
            getCourseSeatModel: function (seatType) {
                return this.getSeatModelMap()[seatType] || CourseSeat;
            },

            /**
             * Returns an array of CourseSeats, ordered as they should be displayed.
             * @param {CourseSeat[]} seats
             * @returns {CourseSeat[]}
             */
            orderSeatsForDisplay: function (seats) {
                return _.sortBy(seats, function (seat) {
                    return this.seatSortObj[seat.getSeatType()];
                }, this);
            },

            orderSeatTypesForDisplay: function (seatTypes) {
                return _.sortBy(seatTypes, function (seatType) {
                    return this.seatSortObj[seatType];
                }, this);
            }
        };
    }
);
