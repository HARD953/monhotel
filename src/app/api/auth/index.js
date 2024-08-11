import NextAuth from 'next-auth'

const router = NextAuth.createRouter({
  api: {
    signin: async (req, res) => {
      // Traitement de la connexion
    },
    callback: async (req, res) => {
      // Traitement du rappel
    },
    signout: async (req, res) => {
      // Traitement de la déconnexion
    },
  },
})

export default router