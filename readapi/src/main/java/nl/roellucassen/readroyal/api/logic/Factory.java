package nl.roellucassen.readroyal.api.logic;


public class Factory {
    private static TokenManagerImpl tokenManager = null;


    public static UserLogic getUserLogic(){
        return new UserLogic();}
    public static AuthLogic getAuthLogic(){
        return new AuthLogic();}

    public static TokenManagerImpl getInstance() {
        if (tokenManager == null)
            tokenManager = new TokenManagerImpl();

        return tokenManager;
    }


}
