<script setup lang="ts"></script>

<template>
  <main>
    <h2>About task</h2>
    <p>
      The goal of this task is to create a page with a form for managing truck data, integrated with
      a mock API available at this address.
    </p>
    <p>
      This page is part of the first module of an ERP application, which will eventually include
      modules for managing various resources (e.g., employees, factories, customers).
    </p>
    <p>
      The user should be able to perform CRUD operations on trucks, ensuring each truck has a unique
      alphanumeric code, a name, a valid status, and optionally a description, while adhering to
      specific status transition rules.
    </p>

    <ul>
      <li>must have unique alphanumeric code</li>
      <li>must have a name</li>
      <li>
        must have a status included in the following set: "Out Of Service", "Loading", "To Job", "At
        Job", "Returning"
      </li>
      <li>"Out Of Service" status can be set regardless of the current status of the Truck</li>
      <li>each status can be set if the current status of the Truck is "Out of service"</li>
      <li>the remaining statuses can only be changed in the following order:</li>
      <li>Loading -> To Job -> At Job -> Returning</li>
      <li>when Truck has "Returning" status it can start "Loading" again.</li>
      <li>may have a description</li>
      <li>
        To complete the task, use one of the following frameworks: Vue.js 3, React or AngularJS 1.x
      </li>
    </ul>
  </main>
</template>
