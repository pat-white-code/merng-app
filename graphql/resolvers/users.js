import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {} from "dotenv";
import { GraphQLError } from "graphql";

const usersResolvers = {
  Mutation: {
    register: async (
      _,
      { registerInput: { email, password, confirmPassword, username } }
    ) => {
      password = await bcrypt.hash(password, 12);

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new GraphQLError("Username already exists.", {
          extensions: {
            code: "USERNAME_ALREADY_EXISTS",
            argumentName: "username",
          },
        });
      }

      const user = new User({
        email,
        password,
        username,
        createdAt: new Date(),
      });

      const res = await user.save();

      const SECRET_KEY = process.env.SECRET_KEY;

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        password,
        token,
      };
    },
  },
};

export default usersResolvers;
