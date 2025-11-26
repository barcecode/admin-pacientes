<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

import { uid } from 'uid';

import Header from './components/Header.vue';
import Formulario from './components/Formulario.vue';
import Paciente from './components/Paciente.vue';

const pacientes = ref([])


const paciente = reactive({
  id: null,
  nombre: '',
  propietario: '',
  email: '',
  alta: '',
  sintomas: ''
});

watch(pacientes, () => {
  guardarLocalStorage()
}, {
  deep: true
})

const guardarLocalStorage = () => {
  localStorage.setItem('pacientes', JSON.stringify(pacientes.value))
}

onMounted(() => {
  const pacientesStorage = localStorage.getItem('pacientes')
  if (pacientesStorage) {
    pacientes.value = JSON.parse(pacientesStorage)
  }
})

const guardarPaciente = () => {
  if (paciente.id) {
    const { id } = paciente
    const index = pacientes.value.findIndex((p) => p.id === id)
    pacientes.value[index] = { ...paciente }
  }
  else {
    pacientes.value.push({
      ...paciente,
      id: uid()
    })
  }

  Object.assign(paciente, {
    nombre: '',
    propietario: '',
    email: '',
    alta: '',
    sintomas: '',
    id: null
  })
}

const actualizarPaciente = (id) => {
  const pacienteEditar = pacientes.value.filter(paciente => paciente.id === id)[0]
  Object.assign(paciente, pacienteEditar)
}

const eliminarPaciente = (id) => {
  pacientes.value = pacientes.value.filter(p => p.id !== id)
}

</script>

<template>
  <div class="container mx-auto mt-20">
    <Header />
    <div class="mt-12 md:flex">
      <Formulario :id="paciente.id" v-model:nombre="paciente.nombre" v-model:propietario="paciente.propietario"
        v-model:email="paciente.email" v-model:alta="paciente.alta" v-model:sintomas="paciente.sintomas"
        @guardar-paciente="guardarPaciente" />
      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">Administra tus pacientes</h3>

        <div v-if="pacientes.length > 0">
          <p class="text-lg mt-5 text-center mb-10">
            Añade pacientes y
            <span class="text-indigo-600 font-bold">adminístralos</span>
          </p>
          <Paciente v-for="paciente in pacientes" :paciente="paciente" @actualizar-paciente="actualizarPaciente"
            @eliminar-paciente="eliminarPaciente" />
        </div>
        <p v-else class="mt-10 text-2xl text-center">No hay pacientes</p>
      </div>
    </div>
  </div>
</template>
