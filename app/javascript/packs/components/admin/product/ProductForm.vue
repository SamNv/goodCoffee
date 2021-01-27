<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.name"
              label="Dessert name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.image"
              label="image"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.discount"
              label="discount (g)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.price"
              label="price (g)"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text >
        Cancel
      </v-btn>
      <v-btn color="blue darken-1" text>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        editedItem: Object,
        formTitle: String
    }
};
</script>

<style lang="scss" scoped></style>
