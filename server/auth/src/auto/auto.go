package auto

import (
	"auth-photo-gallery/src/config"
	"fmt"
	"os"
	"path"
)

func Load() {
	CreateDirectoryStorageIfNoExists("storage_app_photo_gallery")
}

func CreateDirectoryStorageIfNoExists(dir string) {
	rootPath := path.Join(config.ROOT_PATH)
	_, err := os.Stat(dir)

	if os.IsExist(err) {
		fmt.Printf("\n\tReading Directory")
	}

	if os.IsNotExist(err) {
		os.Mkdir(rootPath+"/"+dir, 0755)
	}
}
