<template>
  <div>
    <CCard>
      <CCardHeader>Импорт</CCardHeader>
      <CCardBody>
        <Label label="Файл csv">
          <file-upload
            class="upload"
            :input-id="inputId"
            ref="upload"
            :drop="true"
            @input-file="inputFile"
            @input-filter="inputFilter"
            width="120px"
            v-model="files"
          >
            <CIcon
              name="cil-cloud-upload"
              width="120px"
              :style="{ maxWidth: '300px' }"
            />
          </file-upload>
        </Label>
        <CButton color="primary" class="w-100 mt-3" @click="startImport"
          >Начать импорт</CButton
        >
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    files: [],
  }),
  computed: {
    inputId() {
      return "file-upload-" + this._uid;
    },
  },
  methods: {
    inputFile(newFile, oldFile) {
      //   this.$refs.upload.active = true;
    },

    inputFilter(newFile, oldFile, prevent) {
      newFile.blob = "";
      let URL = window.URL || window.webkitURL;
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file);
      }
    },
    async startImport() {
      try {
        if (!this.files[0]) return;
        const file = this.files[0].file;
        const formData = new FormData();
        console.log(file)
        formData.append("file", file);
        console.log(formData);
        const { data } = await this.$api.post("import", null, formData);
        this.$notify({
          group: "main",
          title: "Файл успешно импортирован",
          type: "success",
        });
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>