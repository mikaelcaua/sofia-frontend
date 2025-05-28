import RoleInterface from "./role_interface"

export default interface UserInteface {
    id: number
    name: string
    email: string
    roles: RoleInterface[]
}