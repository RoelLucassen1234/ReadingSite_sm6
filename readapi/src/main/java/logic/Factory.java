package logic;

import data.UserData;


public class Factory {
    public static UserLogic getUserLogic(){
       UserData userData = new UserData();
        return new UserLogic();}

}
