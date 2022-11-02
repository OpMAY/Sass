package com.aws.model;
import lombok.Data;

@Data
public class Download {
    private String created_local_path;
    private String file_path;
    private String file_name;

    public Download() {

    }

    public Download(String created_local_path, String file_path, String file_name) {
        this.created_local_path = created_local_path;
        this.file_path = file_path;
        this.file_name = file_name;
    }
}
