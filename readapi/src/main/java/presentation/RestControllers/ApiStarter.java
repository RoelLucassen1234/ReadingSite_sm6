package presentation.RestControllers;

import config.HibernateConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiStarter {

    public static void main(String[] args) {
        HibernateConfig.setupHibernate();
        SpringApplication.run(ApiStarter.class, args);

    }

}
