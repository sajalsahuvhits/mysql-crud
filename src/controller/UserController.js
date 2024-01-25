import { StatusCodes } from "http-status-codes";
import { ResponseMessages } from "../utils/ResponseMessages.js";
import { SendResponse } from "../utils/SendResponse.js";
import { runQuery } from "../services/mysqlQueries.js";
const USER_TABLE_NAME = "user";
// export const addUser = (req, res) => {
//   const { name, email, contact } = req.body;

//   var insertQuery = `INSERT INTO ${USER_TABLE_NAME} (name, email, contact) VALUES ('${name}', '${email}', '${contact}')`;
//   db.query(insertQuery, function (err, result) {
//     if (err) {
//       res
//         .status(StatusCodes.BAD_REQUEST)
//         .send({
//           status: StatusCodes.BAD_REQUEST,
//           message: ResponseMessages.USER_NOT_CREATED,
//           data: [err.message],
//         });
//     }else{
//         res
//         .status(StatusCodes.OK)
//         .send({
//           status: StatusCodes.OK,
//           message: ResponseMessages.USER_CREATED,
//           data: result,
//         });
//     }
//   });
// };

export const addEditUser = async (req, res) => {
  try {
    const { id, name, email, contact } = req.body;
    if (id) {
      const findUserQuery =
        "SELECT * FROM ?? WHERE id <> ? AND email = ? LIMIT 1";
      const findUser = await runQuery(findUserQuery, [
        USER_TABLE_NAME,
        id,
        email,
      ]);
      console.log(findUser);
      if (findUser.length) {
        return SendResponse(
          res,
          StatusCodes.CONFLICT,
          ResponseMessages.USER_ALREADY_EXIST
        );
      }
      const updateQuery =
        "UPDATE ?? SET name = ?, email = ?, contact = ? WHERE id = ?";
      const values = [USER_TABLE_NAME, name, email, contact, id];
      const result = await runQuery(updateQuery, values);

      if (result.affectedRows) {
        SendResponse(res, StatusCodes.OK, ResponseMessages.USER_UPDATED, result);
      } else {
        SendResponse(res, StatusCodes.BAD_REQUEST, ResponseMessages.USER_NOT_UPDATED);
      }
    } else {
      const findUserQuery = "SELECT * FROM ?? WHERE email = ? LIMIT 1";
      const findUser = await runQuery(findUserQuery, [USER_TABLE_NAME, email]);
      console.log(findUser);
      if (findUser.length) {
        return SendResponse(
          res,
          StatusCodes.CONFLICT,
          ResponseMessages.USER_ALREADY_EXIST
        );
      }
      const insertQuery =
        "INSERT INTO ?? (name, email, contact) VALUES (?, ?, ?)";
      const values = [USER_TABLE_NAME, name, email, contact];
      const result = await runQuery(insertQuery, values);
      SendResponse(res, StatusCodes.OK, ResponseMessages.USER_CREATED, result);
    }
  } catch (err) {
    SendResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR,
      [err.message]
    );
  }
};

export const getUsers = async (req, res) => {
  try {
    const getQuery = "SELECT * FROM ??";
    const values = [USER_TABLE_NAME];
    const result = await runQuery(getQuery, values);
    SendResponse(res, StatusCodes.OK, ResponseMessages.USER_FETCHED, result);
  } catch (error) {
    SendResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR,
      [error.message]
    );
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const deleteQuery = "DELETE FROM ?? WHERE id = ?";
    const values = [USER_TABLE_NAME, userId];
    const result = await runQuery(deleteQuery, values);
    if (result.affectedRows) {
      SendResponse(res, StatusCodes.OK, ResponseMessages.USER_DELETED);
    } else {
      SendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        ResponseMessages.USER_NOT_DELETED
      );
    }
  } catch (error) {
    SendResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR,
      [error.message]
    );
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const getQuery = "SELECT * FROM ?? WHERE id = ?";
    const values = [USER_TABLE_NAME, id];
    const result = await runQuery(getQuery, values);
    if (result.length) {
      SendResponse(res, StatusCodes.OK, ResponseMessages.USER_FETCHED, result);
    } else {
      SendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        ResponseMessages.USER_NOT_FOUND
      );
    }
  } catch (error) {
    SendResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR,
      [error.message]
    );
  }
};
