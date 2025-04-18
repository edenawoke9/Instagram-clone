import { getServerSession } from "next-auth"
import { authConfig } from "../../auth.config"

export const getSession = async () => {
  return await getServerSession(authConfig)
}