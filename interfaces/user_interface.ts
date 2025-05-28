import { RequestInterface } from "./request_interface"
import { RoleInterface } from "./role_interface"

export interface UserInteface {
    id: number
    name: string
    email: string
    roles: RoleInterface[]
    requests: RequestInterface[]
}