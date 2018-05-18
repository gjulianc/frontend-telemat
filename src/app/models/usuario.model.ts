export class Usuario {

  constructor (
    public nombre: string,
    public email: string,
    public username: string,
    public password: string,
    public telefono?: string,
    public img?: string,
    public role?: string,
    public id?: number,
    public notas?: string
  ) { }

}
