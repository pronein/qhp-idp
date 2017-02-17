'use strict';

module.exports = {
    getUserByUsername: getUserByUsername_mock
};

function getUserByUsername_mock(req, res, next) {
    if (req.swagger.params.username.value === 't444708') {
        res.status(200).send({
            firstName: 'Adam',
            lastName: 'Schrader',
            username: 't444708',
            manager: 'Ramesh Yerneni',
            email: 'adam.schrader@deluxe.com',
            dateOfHire: '2015-08-01',
            team: 'Bankers Dashboard',
            project: 'Bankers Dashboard',
            office: 'Atlanta',
            jobTitle: 'Software Engineer',
            phone: '770-666-1731'
        });
    } else {
        res.status(404).send({message: 'User not found.'});
    }
}