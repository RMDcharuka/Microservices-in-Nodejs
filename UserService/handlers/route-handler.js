/* eslint-disable class-methods-use-this */
const helper = require('./query-handler');
const CONSTANTS = require('../config/constants');

class RouteHandler {
  async getUserDetailsHandler(request, response) {
    const userid = request.params.userId;

    if (!userid) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.USERID_NOT_FOUND,
        });
    }

    try {
      const userDetails = await helper.getUserDetails(userid.trim());

      if (!userDetails) {
        return response
          .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
          .json({
            error: true,
            details: CONSTANTS.USERNAME_DETAIL_FAILED,
          });
      }

      return response
        .status(CONSTANTS.SERVER_OK_HTTP_CODE)
        .json({
          error: false,
          details: userDetails,
        });
    } catch (error) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.SERVER_ERROR_MESSAGE,
        });
    }
  }

  async loginRouteHandler(request, response) {
    const data = {
      name: request.body.name && request.body.name.trim() !== '' ? request.body.name.trim() : null,
      password: request.body.password && request.body.password.trim() !== '' ? request.body.password.trim() : null,
    };

    if (!data.name) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.USERNAME_NOT_FOUND,
        });
    }

    if (!data.password) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.PASSWORD_NOT_FOUND,
        });
    }

    try {
      const result = await helper.login(data);

      if (!result) {
        return response
          .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
          .json({
            error: true,
            message: CONSTANTS.USER_LOGIN_FAILED,
          });
      }

      return response
        .status(CONSTANTS.SERVER_OK_HTTP_CODE)
        .json({
          error: false,
          userId: result,
          message: CONSTANTS.USER_LOGIN_OK,
        });
    } catch (error) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.USER_LOGIN_FAILED,
        });
    }
  }

  async registerRouteHandler(request, response) {
    const data = {
      name: request.body.name && request.body.name.trim() !== '' ? request.body.name.trim() : null,
      lastname: request.body.lastname && request.body.lastname.trim() !== '' ? request.body.lastname.trim() : null,
      email: request.body.email && request.body.email.trim() !== '' ? request.body.email.trim() : null,
      gender: request.body.gender && request.body.gender.trim() !== '' ? request.body.gender.trim() : null,
      password: request.body.password && request.body.password.trim() !== '' ? request.body.password.trim() : null,
    };

    if (!data.name) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.USERNAME_NOT_FOUND,
        });
    }

    if (!data.lastname) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.USERLASTNAME_NOT_FOUND,
        });
    }

    if (!data.email) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.EMAIL_NOT_FOUND,
        });
    }

    if (!data.gender) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.GENDER_NOT_FOUND,
        });
    }

    if (!data.password) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.PASSWORD_NOT_FOUND,
        });
    }

    try {
      data.online = 'Y';
      const result = await helper.registerUser(data);

      if (!result) {
        return response
          .status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE)
          .json({
            error: true,
            message: CONSTANTS.USER_REGISTRATION_FAILED,
          });
      }

      return response
        .status(CONSTANTS.SERVER_OK_HTTP_CODE)
        .json({
          error: false,
          userId: result.insertedId,
          message: CONSTANTS.USER_REGISTRATION_OK,
        });
    } catch (error) {
      return response
        .status(CONSTANTS.SERVER_ERROR_HTTP_CODE)
        .json({
          error: true,
          message: CONSTANTS.SERVER_ERROR_MESSAGE,
        });
    }
  }

  routeNotFoundHandler(request, response) {
    response
      .status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
      .json({
        error: true,
        message: CONSTANTS.ROUTE_NOT_FOUND,
      });
  }
}

module.exports = new RouteHandler();
