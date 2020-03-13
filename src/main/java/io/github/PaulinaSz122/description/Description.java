package io.github.PaulinaSz122.description;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Clob;
import java.sql.Date;
import java.text.DecimalFormat;

@Entity
@Table(name = "descriptions")
public class Description {
    @Id
    @GeneratedValue(generator = "inc")
    @GenericGenerator(name = "inc", strategy = "increment")
    private Integer id;

    @Column(name = "book_id")
    private Integer bookId;
    private String publisher;
    private Date release_date;
    private Clob description;

    public Description() { }

    public Description(Integer id, Integer book_id, String publisher, Date release_date, Clob description) {
        this.id = id;
        this.bookId = book_id;
        this.publisher = publisher;
        this.release_date = release_date;
        this.description = description;
    }

    public Description(Description description) {
        this.id = description.id;
        this.bookId = description.bookId;
        this.publisher = description.publisher;
        this.release_date = description.release_date;
        this.description = description.description;
    }

    public Integer getId() {
        return id;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer book_id) {
        this.bookId = book_id;
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

    public Clob getDescription() {
        return description;
    }

    public void setDescription(Clob description) {
        this.description = description;
    }
}
