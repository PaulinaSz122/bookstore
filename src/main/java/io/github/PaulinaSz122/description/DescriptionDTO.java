package io.github.PaulinaSz122.description;

import java.io.BufferedReader;
import java.io.Reader;
import java.sql.Clob;
import java.sql.Date;

public class DescriptionDTO {
    private Integer id;
    private Integer book_id;
    private String publisher;
    private Date release_date;
    private String description;

    public DescriptionDTO(Integer id, Integer book_id, String publisher, Date release_date, Clob description) {
        StringBuilder sb = new StringBuilder();
        try {
            Reader reader = description.getCharacterStream();
            BufferedReader br = new BufferedReader(reader);
            String line;
            while(null != (line = br.readLine())) {
                sb.append(line);
            }
            br.close();
        } catch (Exception e) {
            return;
        }
        this.id = id;
        this.book_id = book_id;
        this.publisher = publisher;
        this.release_date = release_date;
        this.description = sb.toString();
    }

    public DescriptionDTO(Description description){
        StringBuilder sb = new StringBuilder();
        try {
            Reader reader = description.getDescription().getCharacterStream();
            BufferedReader br = new BufferedReader(reader);
            String line;
            while(null != (line = br.readLine())) {
                sb.append(line);
            }
            br.close();
        } catch (Exception e) {
            return;
        }
        this.id = description.getId();
        this.book_id = description.getBookId();
        this.publisher = description.getPublisher();
        this.release_date = description.getRelease_date();
        this.description = sb.toString();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBook_id() {
        return book_id;
    }

    public void setBook_id(Integer book_id) {
        this.book_id = book_id;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getRelease_date() {
        return release_date;
    }

    public void setRelease_date(Date release_date) {
        this.release_date = release_date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDescription(Clob description) {
        this.description = description.toString();
    }
}
