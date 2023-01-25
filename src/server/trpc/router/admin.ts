import { getJwtSecretKey } from '@lib/auth'
import { SignJWT } from 'jose'
import { router, adminProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'
import cookie from 'cookie'
import { nanoid } from 'nanoid'
import { TRPCError } from '@trpc/server'

// creating an endpoint
export const adminRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { res } = ctx
      const { email, password } = input

      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // user is authenticated as admin

        const token = await new SignJWT({})
          .setProtectedHeader({ alg: 'HS256' })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(new TextEncoder().encode(getJwtSecretKey()))

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('user-token', token, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production'
          })
        )
        return { success: true }
      }

      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password'
      })
    })
})