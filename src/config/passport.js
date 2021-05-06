const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  "local",
  //definimos una nueva estrategia para autenticar
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    // toma los datos y valida con la BDD
    async (email, password, done) => {
      // buscamos el correo en la base de datos
      const user = await User.findOne({ email });
      // si no existe un usuario
      if (!user) {
        return done(null, false, {
          message: "No se encontró un usuario",
        });
      } else {
        // validar si la contraseña coincide con el correo
        const match = await user.comparaPWD(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: "Usuario o contraseña incorrecta",
          });
        }
      }
    }
  )
);

// cuando se registra, guardamos la sesion en el servidor
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// consulta en la base de datos para ver si el usuario
// tiene autorización
passport.deserializeUser((id, done) => {
  // consutla el id de la BDD
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
