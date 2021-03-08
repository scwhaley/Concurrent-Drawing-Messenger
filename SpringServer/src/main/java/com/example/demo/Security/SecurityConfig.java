package com.example.demo.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
 public class SecurityConfig extends WebSecurityConfigurerAdapter {

    //TODO: Finish setting up constructor to inject userdetails service and password encoder
    public SecurityConfig(){

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        //Enable CORS (since Spring is on port 8080 and React is on port 3000) and disable CSRF
        http.cors().and().csrf().disable();

        
        http.authorizeRequests()
            // Public endpoints
            .antMatchers("/api/public/**").permitAll()
            // Private endpoints
            .anyRequest().authenticated().and()
            .addFilter(new LoginJWTCreationFilter(authenticationManager()))
            //disables SpringSecurity's default session creation
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    //TODO: change object to the injected fields
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        //auth.userDetailsService(new userDetailsService).PasswordEncoder(BCryptPasswordEncoder);
    }

    @Bean
    public CorsFilter corsFilter(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", configuration);
        return new CorsFilter(source);
    }


    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

 }


