import UserModel from '#components/user/user-model.js'
import Joi from 'joi'
import argon2, { hash } from 'argon2'
import { sendWelcomeEmail } from '#services/mailing/welcome-email.js'
import jwt from 'jsonwebtoken'

export async function index (ctx) {
  try {
    const user = await UserModel.find({})
    ctx.ok(user)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')
    const user = await UserModel.findById(ctx.params.id)
    if(!user) { return ctx.notFound() }
    ctx.ok(user)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function register (ctx) {
 try {
  const registerValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    terms_and_conditions: Joi.boolean().required(),

  })
  const params = ctx.request.body
  const { error, value } = registerValidationSchema.validate(params)
  if(error) throw new Error(error)
  const hashedPassword = await argon2.hash(value.password)
  const newUser = new UserModel({
    ...value,
    password: hashedPassword,
    settings : {
      terms_and_conditions : value.terms_and_conditions
    }
  })
  newUser.generateEmailVerificationToken()
  // newUser.generateJWT() 
  const user = await newUser.save()
  await sendWelcomeEmail(user, user.settings.validation_email_token)
  ctx.ok(newUser)
  console.log(newUser)
 } catch(e) {
  ctx.badRequest({ message: e.message })
 }
}


export async function login (ctx) {
  try {
    const registerValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    })
    const params = ctx.request.body
    const { error, value } = registerValidationSchema.validate(params)
    if(error) throw new Error(error)

    const userEmail = await UserModel.findOne({ email: value.email }).select('email')
    const email_login = await ctx.request.body.email
    const hashPassword = await UserModel.findOne({ email: value.email }).select('password')
    const password_login = await ctx.request.body.password

    // check le email et le password si l'utilisateur si il existe
    if (userEmail.email == email_login && await argon2.verify(hashPassword.password, password_login)) {
      console.log("Email existe and password match !")
      ctx.body = "Email and password match"

      //Generate un token pour l'utilisateur actuel
      const tokenUser = userEmail.generateJWT()
      ctx.ok(tokenUser)

      const user = await userEmail.save()
      console.log(user)

    } else {
      console.log("Error the email or password is wrong !")
      throw new Error('Error the email or password is wrong !')
    }

  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function profile (ctx) {
  try {

    console.log(ctx.state.user)
    ctx.ok(ctx.state.user)

  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function profileUpdate (ctx) {
  try {

    // console.log(ctx.state.user.id)

    const profileValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    })

    if(!ctx.state.user.id) throw new Error('No id supplied')
    const { error, value } = profileValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)

    const hashedPassword = await argon2.hash(value.password)
    const updatedUserProfile = await UserModel.findByIdAndUpdate(ctx.state.user.id, {...value, password: hashedPassword}, { runValidators: true, new: true })

    console.log(hashedPassword)

    //On sauvegarde dans la base de données
    await updatedUserProfile.save()

    ctx.ok(updatedUserProfile)
    console.log("profile updated")

  } catch (e) {
    console.log("not working")
    ctx.badRequest({ message: e.message })
  }
}

