import React, { useState, useEffect } from 'react';
import logoInstitucional from './assets/Logo Soledad Limpia.png';
import iconoVoz from './assets/voz.png';
import iconoSenas from './assets/señas.png';
import iconoSubtitulos from './assets/subtitulos.png';
import iconoContraste from './assets/contraste.png';

const initialReportes = [
  { id: 1,
    direccion: "Calle 60 con carrera 20",
    tipoResiduo: 'Residuos Orgánicos',
    gravedad: 'Media',
    estado: 'Pendiente',
    cuadrilla: 'Sin Asignar',
    fecha: '2026-10-08',
    reportadoPor: "Pedro Páramo (Ciudadano)"
  },
  {
    id: 2,
    direccion: "Carrera 15 con calle 80",
    tipoResiduo: 'plasticos y papeles',
    gravedad: 'Media',
    estado: 'En Proceso',
    cuadrilla: 'Cuadrilla 2',
    fecha: '2026-10-09',
    reportadoPor: "Pedro Páramo (Ciudadano)"
  }
];

export default function App() {
  const [estaAutenticado, setAutenticado]= useState(false);
  const [rolUsuario, setRolUsuario] = useState('Administrador'); //Administrador, Ciudadano, Recolector
  const [correo, setCorreo] =useState('');
  const [contrasena, setContrasena] = useState('');
  const [vistaActual, setVistaActual] = useState('login'); //login, registrarse, reporte, historial, gestion
  const [mostrarModalCerrar, setMostrarModalCerrar] = useState(false);

  const [reportes, setReportes] = useState(initialReportes);

  //Estados de accesibilidad
  const[lecturaVoz, setLecturaVoz] = useState(false);
  const[altoContraste, setAltoContraste] = useState(false);
  const[modoSenas, setModoSenas] = useState(false);
  const[subtitulos, setSubtitulos] = useState(false);

  const [formData, setFormData] = useState({
    direccion: '',
    tipoResiduo: 'Residuos Orgánicos',
    gravedad: 'media',
    reportadoPor: '',
  });
  const [mesajeExito, setmensajeExito] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!correo || !contrasena) {
      alert("por favor, ingresa correo y contraseña");
      return;
    } 

    if(correo.includes('admin')){
      setRolUsuario('Administrador')
    } else if (correo.includes('recolector')){
      setRolUsuario('Recolector');
    } else {
      setRolUsuario('Ciudadano')
    }
    setAutenticado(true);
    setVistaActual('historial');
  };

  const agregarReporte = (e) => {
    e.preventDefault();
    if (!formData.direccion || !formData.reportadoPor) {
      alert("Por favor completalos campos obligatorios");
      return;
    }

    const nuevo = {
      id: Date.now(),
      ...formData,
      estado: 'Pendiente',
      cuadrilla: 'Sian Asignar',
      fecha: new Date().toISOString().split('T')[0]
    };

    setReportes([nuevo, ...reportes]);
    setFormData({ direccion: '', tipoResiduo: 'Residuos Orgánicos', gravedad: 'Media', reportadoPor: ''});
    setmensajeExito(true);
    setTimeout(() => setmensajeExito(false), 3000);
  };

  const actualizarEstado = (id, nuevoEstado) => {
    setReportes(reportes.map(reporte => reporte.id === id ? { ...reporte, estado: nuevoEstado} : reporte));
  };

  const asignarCuadrilla = (id, cuadrilla) => {
    setReportes(reportes.map(reporte => reporte.id === id ? { ...reporte, cuadrilla: cuadrilla} : reporte));
  };

  if (!estaAutenticado) {
    return (
      <div className='vista-login' style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        fontFamily: 'arial. sans-serif',
        filter: altoContraste ? 'contrast(160%)' : 'none',
        boxSizing: 'border-box'
       }}>

        <header style={{
          backgroundColor: '#ffffff',
          padding: '0.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 10,
          height: '60px',
          boxSizing: 'border-box',
          hidden: 'md:flex',
        }}>
          <div>
            <h2 style={{ margin: 0, color: '#15803d', fontSize: '1.3rem', fontWeight: 'bold' }}>
              SOLEDAD LIMPIA
            </h2>
            <small style={{ color: 'black', fontWeight: '500' }}>Más limpia || Más segura</small>
          </div>

          {/*LOGO Y BUSCADOR*/}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img src={logoInstitucional} alt="Logo Soledad Limpia.png"
            style={{
              height: '45px',
              maxHeight: '45px',
              width: 'auto',
              objectFit: 'contain',
            }} 
          />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            borderRadius: '20px',
            padding: '4px 12px',
            border: '1px solid #e5e7eb'
          }}>
            <input 
            type="text"
            placeholder='Buscar'
            style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', fontSize: '0.85rem', width: '90px' }} 
            />
            <span style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#6b7280' }}></span>
          </div>
          </div>
        </header>

        {/*CONTENEDOR PRINCIPAL*/}

        <div style={{
          position: 'relative',
          display: 'flex',
          width: 'max-w-md',
          height: 'calc(100vh - 60px)',
          background: 'linear-gradient(to right, #0d5c2e 0%, #106634 35%, #0b3c8c 65%, #082b68 100%)',
          boxSizing: 'border-box',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
         }}>
          
          {/* MENU LATERAL IZQUIERDO*/}
          <div style={{
            width: '230px',
            color: 'white',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            flexShrink: 0, 
            boxSizing: 'border-box'
           }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="#Inicio" style={{ color: 'white', textDecoration: 'underline', fontWeight: 'bold', fontSize: '1.05rem' }}>Inicio</a>
              <a href="#quienes" style={{ color: 'white', textDecoration: 'underline', fontWeight: 'bold', fontSize: '1.05rem' }}>¿Quiénes Somos?</a>
              <a href="#funciona" style={{ color: 'white', textDecoration: 'underline', fontWeight: 'bold', fontSize: '1.05rem' }}>¿Cómo Funciona?</a>
              <a href="#mision" style={{ color: 'white', textDecoration: 'underline', fontWeight: 'bold', fontSize: '1.05rem' }}>Misión</a>
              <a href="#vision" style={{ color: 'white', textDecoration: 'underline', fontWeight: 'bold', fontSize: '1.05rem' }}>Visión</a>
              <a href="#informacion" style={{ color: 'white', textDecoration: 'underline', fontWeight: 'bold', fontSize: '1.05rem' }}>Información</a>
            </nav>
          </div>
          
          {/*LOGIN*/}

          {vistaActual === 'login' && (
           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 16px', boxSizing: 'border-box', marginRight: '100px' }}>

            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: '4px solid #eab308',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              marginBottom: '15px'
             }}>
              <img src={logoInstitucional} alt="Logo Soledad Limpia.png"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
               }} 
              />
            </div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)'  ,
              padding: '2.2rem',
              borderRadius: '16px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              width: '100%',
              maxWidth: '400px',
              boxSizing: 'border-box',
              margin: '0 auto'
             }}>
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}>Tipo de usuario</label>
                  <select
                  value={rolUsuario}
                  onChange={(e)=> setRolUsuario(e.target.value)}
                  style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', outline: 'none', backgroundColor: '#f9fafb', boxSizing: 'border-box', fontWeight: '500' }}
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Ciudadano">Ciudadano</option>
                    <option value="Recolector">Recolector</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}>Correo electronico</label>
                  <input 
                  type="email"
                  placeholder='@example.com'
                  required
                  value={correo}
                  onChange={(e)=> setCorreo(e.target.value)}
                  style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }} 
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}>Contraseña</label>
                  <input 
                  type="password"
                  required
                  value={contrasena}
                  onChange={(e)=> setContrasena(e.target.value)} 
                  style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', outline: 'none', boxSizing: 'border-box', backgroundColor: '#f9fafb' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.3rem' }}>
                  <button
                  type='submit'
                  style={{backgroundColor: '#a5b4fc', color: '#1e1b4b', padding: '8px 20px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Ingresar
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem', fontSize: '0.8rem'}}>
                  <a href="#olvido" style={{ color: '#1f2937', fontWeight: 'bold', textDecoration: 'underline' }}>¿Olvidaste tu contraseña?</a>
                  <span
                  translate='no'
                  onClick={() => setVistaActual('registrarse')}
                  style={{ color: '#1f2937', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer'}} 
                  >
                    Registrarse
                  </span>
                </div>
              </form>
            </div>
           </div>
          )}

          {vistaActual === 'registrarse' && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '1.5rem 2.5rem',
              borderRadius: '16px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              width: '95%',
              maxWidth: '1000px',
              boxSizing: 'border-box',
              margin: '0 auto',
              overflow: 'hidden'
             }}>
              <h2 style={{ textAlign: 'center', color: '#15803d', marginBottom: '1.5rem', marginTop: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>Registro de usuario</h2>
              <form onSubmit={(e) => {e.preventDefault(); alert('¡Registrado con éxito!'); setVistaActual('login');}} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem'}}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem 1.5rem', marginBottom: '1.5rem', width: '100%' }}>

                  <div style={{ width: '100%'}}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>Nombres</label>
                    <input type="text" required placeholder='' style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} />
                  </div>

                  <div style={{ width: '100%'}}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Correo electrónico</label>
                    <input type="email" required placeholder='@example.com' style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} />
                  </div>

                  <div style={{ width: '100%'}}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Contraseña</label>
                    <input type="password" required style={{ width: '100%', padding: '9px 35px 9px 9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} />
                    <span style={{ position: 'absolute', right: '10px', cursor: 'pointer', opacity: 0.6, fontSize: '0.9rem' }}></span>
                  </div>

                  <div style={{ width: '100%'}}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Apellidos</label>
                    <input type="text" required placeholder='' style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} />
                 </div>

                 <div style={{ width: '100%'}}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>País</label>
                    <select style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', backgroundColor: 'white', outline: 'none' }}>
                      <option value="">Seleccione país</option>
                      <option value="Colombia">Colombia</option>
                    </select>
                 </div>

                 <div style={{ width: '100%'}}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Repetir contraseña</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input type="password" required style={{ width: '100%', padding: '9px 35px 9px 9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} />
                    <span style={{position: 'absolute', right: '10px', cursor: 'pointer', opacity: 0.6, fontSize: '0.9rem' }}></span>
                  </div>
                 </div>

                
                 <div style={{ width: '100%'}}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Fecha de nacimiento</label>
                    <input type="date" required placeholder='DD//MM//AAAA' style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', backgroundColor: 'white', outline: 'none' }} />
                 </div>

                 <div style={{ width: '100%'}}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Dirección</label>
                    <input type="text" required placeholder='Calle, carrera, diagonal' style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} />
                 </div>

                 <div style={{ width: '100%'}}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Número de teléfono</label>
                    <input type="tel" required placeholder='000-000-000' style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} />
                 </div>

                 <div style={{ width: '100%'}}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Tipo de documento</label>
                    <select style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', backgroundColor: 'white', outline: 'none' }}>
                    <option value="">Selecione documento</option>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="CE">Cédula de extranjería</option>
                    <option value="Nit">Nit</option>
                    </select>
                 </div>
                 
                 <div style={{ width: '100%'}}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Barrio</label>
                    <input type="text" required placeholder='' style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} />
                 </div>

                 <div style={{ width: '100%'}}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Género</label>
                    <select style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', backgroundColor: 'white', outline: 'none' }}>
                    <option value="">Selecione opción</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                    </select>
                 </div>

                 <div style={{ width: '100%'}}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>Número de documento</label>
                    <input type="text" required placeholder='1234567890' style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} />
                 </div>

                 <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                  <button
                  type='button'
                  onClick={() => setVistaActual('login')}
                  style={{
                    backgroundColor: '#22c55e',
                    color: 'white',
                    padding: '10px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba()0,0,0,0.2'
                  }}
                  >
                    Cancelar
                  </button>

                  <button
                  type='submit'
                  style={{
                    backgroundColor: '#15823d',
                    color: 'white',
                    padding: '10px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}
                  >
                    Registrarse
                  </button>
                </div>
                 </div>
              </form>
            </div>
          )}

          {vistaActual === 'reporte' && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '2.5rem 3rem',
              borderRadius: '16px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              width: '95%',
              maxWidth: '850px',
              boxSizing: 'border-box',
              margin: '0 auto',
              maxHeight: '90vh',
              overflowY: 'auto'
             }}>
              <h2 translate='no' style={{ textAlign: 'center', color: '#15803d', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.8rem' }}>
                Reporte de puntos críticos
              </h2>
              <p style={{textAlign: 'center', color: '#4b5563', fontSize: '00.95rem', marginBottom: '2rem'}}>
                Indique la ubicación y detalles del residuo para programar la recolección.
              </p>

              <form onSubmit={(e) => {agregarReporte(e)}}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#1f2937', marginBottom: '4px' }}>
                      Dirección de recogida *
                    </label>
                    <input 
                    type="text"
                    required
                    placeholder='Ej: calle 45 # 22 - 10'
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} 
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#1f2937', marginBottom: '4px' }}>
                      Barrio *
                    </label>
                    <input 
                    type="text"
                    required
                    placeholder='Ej: El Hipódromo'
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', outline: 'none' }} 
                    />
                  </div>

                  <div style={{marginBottom: '1.2rem', }}>
                    <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#1f2937', marginBottom: '4px' }}>
                      Descripción del problema*
                    </label>
                    <textarea rows="4"
                    required
                    placeholder='Describa el tipo de residuos acumulados'
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #9ca3af', boxSizing: 'border-box', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}>
                    </textarea>
                  </div>

                  <div style={{ marginBottom: '2rem'}}>
                    <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', color: '#1f2937', marginBottom: '4px' }}>
                      Evidencia fotográfica (opcional)
                    </label>
                    <input 
                    type="file"
                    accept='image/*'
                     style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #9ca3af', backgroundColor: '#f9fafb', boxSizing:  'border-box' }}
                     />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', }}>
                    <button
                    type='button'
                    translate='no'
                    onClick={(e) => setVistaActual('login')}
                    style={{ backgroundColor: '#6b7280', color: 'white', padding: '10px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Cancelar
                    </button>

                    <button
                    type='submit'
                    translate='no'
                    style={{ backgroundColor: '#6b7280', color: 'white', padding: '10px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Enviar reporte
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          
           {vistaActual === 'historial' && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '2rem 2.5rem',
              borderRadius: '16px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              width: '95%',
              maxWidth: '1250px',
              boxSizing: 'border-box',
              margin: '0 auto',
              maxHeight: '90vh',
              overflowY: 'auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 style={{ margin: 0, color: '#15803d', fontSize: '1.5rem' }}>
                    {rolUsuario === 'Ciudadano' && 'Mis reportes Realizados'}
                    {rolUsuario === 'Recolector' && 'Rutas y Puntos Asignados'}
                    {rolUsuario === 'Administrador' && 'Historial y Gestión de reportes'}
                  </h2>

                  {rolUsuario === 'Ciudadano' && (
                    <button
                    onClick={() => setVistaActual('reporte')}
                    style={{ backgroundColor: '#15803d', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Nuevo reporte
                    </button>
                  )}
                </div>
             
             <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#15803d', color: 'white' }}>
                    <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>ID</th>
                    <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Fecha Reporte</th>
                    <th style={{ padding: '10px' }}>Dirección</th>
                    <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Residuo</th>
                    <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Gravedad</th>
                    <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Estado</th>
                    <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Cuadrilla</th>

                    {rolUsuario === 'Administrador' && (
                      <th style={{ padding: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>Reportado Por</th>
                    )}

                    <th style={{ padding: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte) => (
                    <tr key={reporte.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>#REP-{reporte.id}</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>{reporte.fecha}</td>
                      <td style={{ padding: '10px' }}>{reporte.direccion}</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>{reporte.tipoResiduo}</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>{reporte.gravedad}</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                        <span style={{
                          backgroundColor: reporte.estado === 'Pendiente' ? '#fef3c7' : '#dbeafe',
                          color: reporte.estado === 'Pendiente' ? '#92400e' : '#1e3a8a',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {reporte.estado}
                        </span>
                      </td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>{reporte.cuadrilla}</td>

                      {rolUsuario === 'Administrador' && (
                        <td style={{ padding: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>{reporte.reportadoPor}</td>
                      )}

                      <td style={{ padding: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        {rolUsuario === 'Recolector' && (
                          <button
                        onclick={() => actualizarEstado(reporte.id, 'En Proceso')}
                        style={{ backgroundColor: '#2563eb', color: 'white', padding: '4px 8px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          Atender Ruta
                        </button>
                        )}

                        {rolUsuario === 'Administrador' && (
                          <button
                          onclick={() => asignarCuadrilla(reporte.id, 'Cuadrilla Asignada')}
                          style={{ backgroundColor: '#2563eb', color: 'white', padding: '4px 8px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                          >
                            Gestionar
                          </button>
                        )}

                        {rolUsuario === 'Ciudadano' && (
                          <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>En seguimiento</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
             </div>

             <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.2rem' }}>
                <button
                onClick={() => setMostrarModalCerrar(true)}
                style={{ backgroundColor: '#6b7280', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Cerrar Sesion
                </button>
             </div>
            </div>
           )}

           {vistaActual === 'gestion' && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '2rem 2.5rem',
              borderRadius: '16px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              width: '95%',
              maxWidth: '1250px',
              boxSizing: 'border-box',
              margin: '0 auto',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <h2 style={{ margin: 0, color: '#15803d', fontSize: '1.5rem', marginBottom: '1rem' }}>Gestión de reportes</h2>

              <div style={{ display:'flex', gap: '1rem', marginBottom: '1.2 rem', backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <label style={{fontSize: '0.8rem', fontWeight: 'bold', display: 'block', color: '#374151' }}>Desde:</label>
                  <input type="date" defaultValue="2023-01-01" style={{padding: '6px', borderRadius: '6px', border: '1px solid #9ca3af' }} />
                </div>
                <div>
                  <label style={{fontSize: '0.8rem', fontWeight: 'bold', display: 'block', color: '#374151' }}>Hasta:</label>
                  <input type="date" defaultValue="2023-01-31" style={{padding: '6px', borderRadius: '6px', border: '1px solid #9ca3af' }} />
                </div>
                <div style={{ flex: 1, minWidth: '200px', }}>
                  <label style={{fontSize: '0.8rem', fontWeight: 'bold', display: 'block', color: '#374151' }}>Buscar:</label>
                  <input type="text" placeholder='Ingrese placa del vehiculo o nombre de conductor' style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #9ca3af', boxSizing: 'border-box' }} />
                </div>
              </div>

              {/*TABLA DE DATOS*/}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#15803d', color: 'white' }}>
                      <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Código</th>
                      <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Fecha</th>
                      <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Hora</th>
                      <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Nº vehículo</th>
                      <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Placa</th>
                      <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Supervisor</th>
                      <th style={{ padding: '10px' }}>Ubicación</th>
                      <th style={{ padding: '10px', whiteSpace: 'nowrap' }}>Estado</th>
                      <th style={{ padding: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>Evidencias</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>#REP-001</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>15/03/2023</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>09:30 a.m.</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>V-001</td>
                      <td style={{ padding: '10px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ABC-123</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>Juan Pérez</td>
                      <td style={{ padding: '10px' }}>Calle 45 # 22-10 (El Hipódromo)</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                        <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          Pendiente
                        </span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <button style={{ backgroundColor: '#e5e7eb', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>Ver fotos</button>
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>#REP-002</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>15/03/2023</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>11:30 a.m.</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>V-002</td>
                      <td style={{ padding: '10px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>XYZ-923</td>
                      <td style={{ padding: '10px',whiteSpace: 'nowrap' }}>María García</td>
                      <td style={{ padding: '10px' }}>Calle 60 # 22-30 (Las Moras)</td>
                      <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>
                        <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          Pendiente
                        </span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <button style={{ backgroundColor: '#e5e7eb', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>Ver fotos</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> 
            </div>
          )}

          {/*BARRA LATERAL DERECHA ACCESIBILIDAD*/}
          <div style={{
            width: '70px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
            zIndex: 2
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(8px)',
              borderRadius: '25px',
              padding: '10px 6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>

              {/*LECTURA POR VOZ*/}
              <button
              title='lector de pantalla'
              onClick={() =>{
                setLecturaVoz(!lecturaVoz);
                alert(lecturaVoz ? "Lector de voz desactivado" : "Lector de voz activado");
              }}
              style={{ border: 'none', background: lecturaVoz ? '#facc15' : 'transparent', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                <img src={iconoVoz} alt="voz.png" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
              </button>

              {/*LENGUAJE DE SEÑAS*/}
              <button
              title='lenguaje de señas'
              onClick={() => {
                setModoSenas(!modoSenas);
                alert(modoSenas ? "Lenguaje de señas desactivado" : "Lenguaje de señas activado");
              }}
              style={{ border: 'none', background: modoSenas ? '#facc15' : 'transparent', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img src={iconoSenas} alt="señas.png" style={{ width: '20px', height: '20px', objectFit: 'contain'}} /> 
              </button>

              {/*SUBTITULOS*/}
              <button
              title='subtitulos'
              onClick={()=> {
                setSubtitulos(!subtitulos);
                alert(subtitulos ? "Subtitulos desactivado" : "Subtitulos activado");
              }}
              style={{ border: 'none', background: subtitulos ? '#facc15' : 'transparent', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img src={iconoSubtitulos} alt="subtitulos.png" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
              </button>

              {/*ALTO CONTRASTE*/}
              <button
              title='Alto contraste'
              onClick={()=> {
                setAltoContraste(!altoContraste);
                alert(altoContraste ? "Alto contraste desactivado" : "Alto contraste activado");
              }}
              style={{ border: 'none', background: altoContraste ? '#facc15' : 'transparent', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img src={iconoContraste} alt="contraste.png" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
              </button>
            </div>
          </div>
        </div>  

        {mostrarModalCerrar && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#15803d', marginBottom: '0.8rem', fontSize: '1.25rem' }}>¿Deseas cerrar sesión?</h3>
              <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>Estas a punto de cerrar tu sesión</p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button
                onClick={() => {
                  setMostrarModalCerrar(false);
                  setVistaActual('login');
                  setRolUsuario('');
                }}
                style={{ backgroundColor: '#e5e7eb', color: '#374151', padding: '8px 16px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                onClick={() => {
                  setMostrarModalCerrar(false);
                  setAutenticado(false);
                  setVistaActual('login');
                  setRolUsuario('');
                }}
                style={{ backgroundColor: '#dc2626', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
       </div>
    );
  }
}