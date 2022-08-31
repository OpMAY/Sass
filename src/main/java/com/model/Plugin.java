package com.model;

import com.model.common.MFile;
import com.model.common.Time;
import com.model.grant.PLUGIN_TYPE;
import lombok.Data;

import java.util.ArrayList;

@Data
public class Plugin extends Time {
    private int no;
    private String title;
    private String desc;
    private MFile profile_image;
    private int subscribes;
    private boolean install = false;
    private ArrayList<String> hashtag;
    private MFile detail_image;
    private String manual;
    private String instruction;
    private PLUGIN_TYPE type;

    @Override
    public String toString() {
        return "Plugin{" +
                "no=" + no +
                ", title='" + title + '\'' +
                ", desc='" + desc + '\'' +
                ", profile_image=" + profile_image +
                ", subscribes=" + subscribes +
                ", install=" + install +
                ", hashtag=" + hashtag +
                ", detail_image=" + detail_image +
                ", manual='" + manual + '\'' +
                ", instruction='" + instruction + '\'' +
                ", type='" + type + '\'' +
                super.toString() +
                '}';
    }
}
